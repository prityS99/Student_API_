"use client";

import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { Student } from "@/types/student";

interface Props {
  initialData?: Student;
  onSubmit: (data: FormData) => void;
}

export default function StudentForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [standard, setStandard] = useState(initialData?.standard || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("standard", standard);
    formData.append("address", address);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <Stack spacing={2}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Standard" value={standard} onChange={(e) => setStandard(e.target.value)} />
      <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  );
}