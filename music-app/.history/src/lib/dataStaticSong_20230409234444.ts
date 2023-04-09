

import audio from "../../public/aa.mp3"
export const dataSong = [
    {title: "Chung ta cua hien tai",audio:audio ,img: "data:image/jpeg;base64,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"},
    {title: "Lac Troi",audio:audio ,img: ""},
    {title: "Em cua ngay Hom qua",audio:audio ,img: ""},
    {title: "Anh sai roi",audio:audio ,img: ""},
    {title: "There's not at all",audio:audio ,img: ""},
    {title: "Nang Am Xa Dan",audio:audio ,img: ""},
]