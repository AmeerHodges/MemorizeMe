import { StyleSheet } from "react-native";
import colors from "../Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },

  profileImage: {
    width: 60,
    height: 100,
    borderRadius: 40,
    marginTop: 20,
    marginLeft: 15,
  },

  titlesWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  titlesHeader1: {
    fontSize: 32,
    color: colors.textDark,
    fontWeight: "900",
  },

  infoWrapper: {
    paddingTop: 20,
  },
  categoryListWrapper: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  categoryItemMainText: {
    textAlign: "center",
    fontSize: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    fontWeight: "bold",
  },

  categoryItemSubText: {
    flexDirection: "row",
    textAlign: "center",
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  subjectWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subjectTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  subjectCardWrapper: {
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
  },
  subjectLeftWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -5,
  },
  subjectMainText: {
    marginLeft: 10,
    fontSize: 16,
  },
  subjectSubTextWrapper: {
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  subjectSubText: {
    fontSize: 14,
    color: colors.grey,
  },
  subjectCardRight: {
    alignContent: "center",
    flexDirection: "row",
    paddingBottom: -5,
    marginTop: -10,
  },
  subjectImage: {
    width: 64,
    height: 64,
    marginRight: 30,
  },
  subjectArrow: {
    alignSelf: "center",
    paddingRight: 15,
  },
  addSubjectWrapper: {
    borderColor: colors.grey,
    borderRadius: "60%",
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addSubjectContainer: {
    paddingHorizontal: "45%",
    marginTop: 20,
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackground: {
    backgroundColor: "white",
    borderWidth: 5,
    borderRadius: 30,
    width: "70%",
    height: "40%",
    alignItems: "center",
  },
  modalContent: {
    alignContent: "center",
    justifyContent: "center",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.textDark,
    fontSize: 20,
    marginTop: 10,
    paddingVertical: 15,
  },
  modalInput: {
    marginBottom: 15,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: colors.grey,
    color: colors.textDark,
  },
  modalButton: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingVertical: 5,
    width: 100,
    marginTop: 30,
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 30,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
