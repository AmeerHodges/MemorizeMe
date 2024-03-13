import { MaterialCommunityIcons } from "@expo/vector-icons"; //open source icons
import subjectDatas from "./subjectsData";

function average() {
  var total = 0;
  subjectDatas.forEach((item) => {
    total += item.Progress;
  });
  return total / subjectDatas.length;
}

const infoData = [
  {
    id: 1,
    iconName: "fire",
    iconSize: 20,
    title: "Streak",
    selected: true,
    Data: 10,
  },
  {
    id: 2,
    iconName: "animation-outline",
    iconSize: 20,
    title: "Cards Studied",
    selected: false,
    Data: 2145,
  },
  {
    id: 3,
    iconName: "percent-outline",
    iconSize: 20,
    title: "Learned",
    selected: false,
    Data: average(),
  },
];

export default infoData;
