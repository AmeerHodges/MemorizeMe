const subjectDatas = [
  {
    id: 1,
    image: require("../images/french_flag.png"),
    title: "French",
    Progress: 50,
    color: "#8ab7ff",
  },
  {
    id: 2,
    image: require("../images/placeholder_subject.png"),
    title: "PlaceHolder",
    Progress: 30,
    color: "#679787",
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
