import FilePickerLG from "../components/Filepicker/FilePickerLG.vue";

export default {
  title: "Components/FilePicker/Default",
  component: FilePickerLG,
  tags: ["autodocs"],
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 450px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    errorText: {control: "text"},
    file: {control: "object"},
    imageOnly : {control: "boolean"},
    uniqueKey : {control: "text" , require: true},
    maxSize: {control: "number", description: "Ukuran maksimal file (bytes)"},
    pdfOnly: {control: "boolean", description: "Hanya terima file PDF"}
  },
  args: {
    errorText: "File terlalu besar, maksimal 1 MB.",
    uniqueKey: "fileInput",
    imageOnly : false,
    maxSize: 1048576,
    pdfOnly: false
  },
};

export const FilePicker = {};

export const ImagePicker = {
  args: {
    imageOnly: true,
    niqueKey: "imageInput",
  },
};
