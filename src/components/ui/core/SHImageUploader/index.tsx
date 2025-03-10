import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../input";
import Image from "next/image";

type TImageUploaderProps = {
  imageFiles: File[] | [];
  setImageFiles: Dispatch<SetStateAction<File[] | []>>;
};

const SHImageUplader = ({ imageFiles, setImageFiles }: TImageUploaderProps) => {
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  return (
    <div>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
      ></Input>
    </div>
  );
};

export default SHImageUplader;
