import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("서버에서 반환한 옵션의 이미지가 있는지 확인", async () => {
  render(<Options optionType="scoops" />);

  //이미지 찾기
  //MEMO 서버에서 axios 비동기로 데이터 가져오는거라 findAllByRole 써야함
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); //alt 값이 대소문자 상관없는 scoop으로 끝나는 문자열
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((scoop) => scoop.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
