import FilePickerLG from "../components/Filepicker/FilePickerLG.vue";

export default {
  title: "Components/FilePicker/Default",
  component: FilePickerLG,
  tags: ["autodocs"],
  argTypes: {
    errorText: {contorl: "text"},
    file: {control: "object"},
    imageOnly : {control: "boolean"},
    uniqueKey : {control: "text" , require: true}
  },
  args: {
    errorText: "File terlalu besar, maksimal 1 MB.",
    uniqueKey: "fileInput",
    imageOnly : false,
  },
};

export const FilePicker = {};

export const ImagePicker = {
  args: {
    imageOnly: true,
    niqueKey: "imageInput",
  },
};
