import { Controller, Get } from "@nestjs/common"

const backgrounds = [
  "https://drive.google.com/thumbnail?id=11Zd-BAQtrGgHSoHx-sAklOwK0QVAyiAN&sz=w1024",
  "https://drive.google.com/thumbnail?id=1s-bOpBRaMDGKGoXgoq7ORU0xCTZtB8B6&sz=w1024",
  "https://drive.google.com/thumbnail?id=11qqWhA-2dgBr14Cp18qq9ZplvgNmyRl5&sz=w1024",
  "https://drive.google.com/thumbnail?id=1lCeacZCvtJCSsyYBjQagLJi4jWOpW5WK&sz=w1024",
  "https://drive.google.com/thumbnail?id=1I5CCGch1R_Pd0qVUpqmwtQfsrIWe3BxU&sz=w1024",
  "https://drive.google.com/thumbnail?id=1JdZBaClGLxocXOJWf5FGCxeTo7aihrZq&sz=w1024",
  "https://drive.google.com/thumbnail?id=15etTbQ-YCn8ImCeLA77TvNHAwwdIN3BJ&sz=w1024",
  "https://drive.google.com/thumbnail?id=1G97BdU1O52tvQv28044I9ChLKMOK5MtI&sz=w1024",
  "https://drive.google.com/thumbnail?id=157gnBPqw0uydAXCWB7HmuOxCvN_bKNcS&sz=w1024",
  "https://drive.google.com/thumbnail?id=1l1EJ_EkQ-V_7GL08ks6d20FU4obfWVhy&sz=w1024",
]

@Controller("")
class AppController {
  constructor() {}

  @Get("/")
  getOneRandomFact() {
    return `<div style="background-color: #231726; top: 0px; left: 0px; right: 0px; bottom: 0px; position: absolute; display: flex; align-items: center; justify-content: center">
              <img src="${
                backgrounds[Math.floor(Math.random() * 10)]
              }" alt="" style="width: 50%; height: fit-content; border-radius: 20px;"/>
            </div>`
  }
}

export { AppController }
