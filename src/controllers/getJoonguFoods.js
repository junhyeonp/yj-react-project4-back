export const getJoonguFoods = async (req, res) => {
    console.log("api");
    await fetch("https://api.odcloud.kr/api/15052602/v1/uddi:855807e2-fe8a-4e47-8a5a-ce1894e410d7_201909031553?page=1&perPage=10&serviceKey=LZLRsS6R%2FQ38skNVYM80i1xs9N7rAu7y8nZ6WCXtwKkghJCeq8hVOtfA%2B4aVRqJDDjn%2FHVKanJgij%2FmdcfCgSQ%3D%3D")
    .then(res => res.json()).then(data => {console.log(data); res.send(data);});
}