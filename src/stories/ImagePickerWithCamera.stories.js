import InputCamera from "../components/Input/InputCamera.vue";



export default {
  title: "Components/FilePicker/ImagePickerWithCamera",
  component: InputCamera,
  tags: ["autodocs"],
  argTypes: {
    errorText: {contorl: "text"},
    file: {control: "object"},
    showPreview : {control: "boolean"},
    uniqueKey : {control: "text" , require: true}
  },
  args: {
    errorText: "File terlalu besar, maksimal 1 MB.",
    uniqueKey: "imageInput",
    title: "Upload Foto",
    useBottomSheet: false,
    compressionMaxKb: 1024,
  },
};

export const Default = {};
