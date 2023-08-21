import User from "../models/user.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const postRegisterMember = async (req, res) => {
    try {
        const { username, password, email, name, mobile, address2 } = req.body;
        const address = address2;
        const user = await User.create({
            username,
            password,
            name,
            email,
            mobile,
            address,
            createdAt: Date.now(),
        });
        res.json({ ok: "true", user });
    } catch (error) {
        console.log(error);
    }
};

export const postUsernameSignIn = async (req, res) => {
    const { username, password } = req.body;
    // 에러처리
    if (username === "" || password === "") {
        res.json({
            ok: "false",
            message: "아이디와 패스워드는 반드시 입력해야 합니다.",
        });
    }

    // 아이디 확인
    // 몽구스 문법
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({
            ok: "false",
            message: "해당하는 유저가 없습니다",
        });
    }

    // 데이터베이스에 갖다와야 하기 때문에 비동기 방식 사용
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res
            .status(401)
            .json({ ok: "false", message: "아이디/패스워드가 다릅니다." });
    }

    // 쿠키(몇 kb밖에 못 실음) 전송

    try {
        const accessToken = Jwt.sign(
            {
                id: user._id,
            },
            process.env.ACCESS_SECRET
        );
        res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: false,
            sameSite: "None",
        });
        res.status(200).json({ ok: "true" });
    } catch (error) {
        console.log(error);
    }
};

export const getLoginSuccess = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = Jwt.verify(token, process.env.ACCESS_SECRET);
        const userData = await User.findOne({ _id: data.id });

        res.status(200).json({
            ok: "true",
            email: userData.email,
            username: userData.username,
            avatar: userData.avatarUrl,
        });
    } catch (error) {
        res.status(400).json({ ok: "false" });
        console.log(error);
    }
};

// 로그아웃
export const logout = async (req, res) => {
    try {
        res.cookie("accessToken", "", {
            secure: true,
            httpOnly: false,
            sameSite: "None",
        });
        // 터미널에서 확인할 수 있음
        res.status(200).json({ ok: "true", message: "로그아웃 성공" });
    } catch (error) {
        console.log(error);
    }
};

// 카카오 로그인
export const kakaoLogin = async (req, res) => {
    try {
        const KAKAO_BASE_PATH = "https://kauth.kakao.com/oauth/token";
        const config = {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            code: req.body.code,
        };
        const params = new URLSearchParams(config).toString();
        const finalUrl = `${KAKAO_BASE_PATH}?${params}`;

        const data = await fetch(finalUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const tokenRequest = await data.json();
        console.log(tokenRequest);

        // 카카오 3단계(사용자 정보 받아오기)
        if ("access_token" in tokenRequest) {
            const { access_token } = tokenRequest;
            const userRequest = await fetch(
                "https://kapi.kakao.com/v2/user/me",
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            const userData = await userRequest.json();

            // 로그인로직
            const {
                kakao_account: {
                    profile: { nickname, thumbnail_image_url },
                    email,
                },
            } = userData;

            // email: email 줄여서 email, 앞의 email은 db의 칼럼에 해당하고 뒤의 email은 받아오 email임
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                try {
                    // 로그인
                    const accessToken = Jwt.sign(
                        {
                            id: existingUser._id,
                        },
                        process.env.ACCESS_SECRET
                    );
                    res.cookie("accessToken", accessToken, {
                        secure: true,
                        httpOnly: false,
                        sameSite: "None",
                    });
                    res.status(200).json({ ok: "true" });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ ok: accessToken });
                }
            } else {
                // 회원가입
                const user = await User.create({
                    name: nickname,
                    username: nickname,
                    email: email,
                    avatarUrl: thumbnail_image_url,
                    createdAt: Date.now(),
                });

                // 회원가입 후 로그인
                try {
                    const accessToken = Jwt.sign(
                        {
                            id: user._id,
                        },
                        process.env.ACCESS_SECRET
                    );
                    res.cookie("accessToken", accessToken, {
                        secure: true,
                        httpOnly: false,
                        sameSite: "None",
                    });
                    res.status(200).json({ ok: "true" });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ ok: accessToken });
                }
            }

            console.log(nickname, email, thumbnail_image_url);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: "false" });
    }
};
