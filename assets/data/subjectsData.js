const subjectDatas = [
  {
    id: 1,
    image: require("../images/french_flag.png"),
    title: "French",
    Learned: 50,
  },
  {
    id: 2,
    image: require("../images/placeholder_subject.png"),
    title: "PlaceHolder",
    Learned: 30,
  },
];
function addSubject(imagePath, name, progress) {
  subjectDatas([
    ...{
      id: subjectDatas.length,
      image: imagePath,
      title: name,
      Learned: progress,
    },
  ]);
}
export default subjectDatas;
