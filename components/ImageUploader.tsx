"use client";

import React, { useState } from "react";
import { Trash2, UploadCloud } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import makeAnimated from "react-select/animated";
import AsyncCreatableSelect from "react-select/async-creatable";
import { useSession } from "next-auth/react";
import { baseStyles } from "@nextui-org/react";

const animatedComponents = makeAnimated();

type FormData = z.infer<typeof PostValidator>;

const promiseOptions = (inputValue: string, callback: any) => {
  // Use the fetch API to make an HTTP request to your endpoint
  return fetch(`/api/tags/${inputValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Ensure the data from the server is in the expected format
      if (Array.isArray(data)) {
        // Map the data to the format required by the component
        const options = data.map((tag) => ({ value: tag.id, label: tag.name }));

        callback(options);
      }
      return [];
    })
    .catch((error) => {
      console.error("Error fetching tags:", error);
      return [];
    });
};

const ImageUploader = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      imageUrl: "",
      tags: [],
    },
  });

  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { data: session } = useSession();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size / (1024 * 1024) > 2) {
        toast.error("Please select image file with size less than 2MB");
        return;
      }
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setSelectedImageURL(url);
        setImageFile(file);
        setValue("imageUrl", url);
      } else {
        // Clear the selected image if it's not an image
        setSelectedImageURL(null);
        setImageFile(null);
        toast.error(
          "Please select a valid image file (e.g., JPG, JPEG, PNG, GIF)."
        );
      }
    }
  };

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title, imageUrl, tags }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, imageUrl, tags };
      const { data } = await axios.post("/api/post/create", payload);
      return data;
    },
    onError: () => {
      setIsLoading(false);

      return toast.error("Something Went Wrong", {
        description: "Your post was not published. Please try again.",
        duration: 4000,
      });
    },
    onSuccess: (data) => {
      setIsLoading(false);

      toast.success("Success", {
        description: "Your post has been published.",
      });

      router.push(`/user/${session?.user.id}`);

      return;
    },
  });

  const onSubmit = async (data: FormData) => {
    // let url = '';
    let imageUrl = "";

    if (imageFile) {
      setIsLoading(true);
      const imageData = new FormData();
      imageData.set("file", imageFile);

      try {
        const { data } = await axios.post("/api/upload", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = data.imageUrl;
      } catch (error) {
        toast.error("Image upload failed");
      }
    }

    const payload: PostCreationRequest = {
      title: data.title,
      imageUrl: imageUrl,
      tags: data.tags,
    };

    createPost(payload);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8 gap-4">
      <h1 className="text-center text-2xl font-semibold mb-4">
        {!selectedImageURL ? (
          <span>Share your photos and share memories</span>
        ) : (
          <span>Add some more information about your image</span>
        )}
      </h1>
      {selectedImageURL ? (
        <div className="flex gap-4 justify-center items-center w-full">
          <div className="flex flex-col md:flex-row bg-base-200 p-1 md:p-6 w-full sm:w-[80%] md:w-[90%] rounded-xl gap-8">
            <div className="w-full  md:w-[50%] max-h-[700px] rounded-xl flex items-center">
              <img
                src={selectedImageURL}
                className="object-cover rounded-xl w-full h-full"
                alt="Selected"
              />
            </div>
            <div className="w-full md:w-[50%]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col h-full">
                <input
                  {...register("imageUrl")}
                  type="text"
                  name="uploadedFile"
                  className="hidden"
                />
                <div className="flex flex-col gap-2 w-full px-2 md:px-8 mb-6">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="enter a title"
                    {...register("title")}
                    className="input rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full px-2 md:px-8 mb-6">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Some additional description"
                    className="input rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full px-2 md:px-8 mb-6 text-white">
                  <label>Tags</label>
                  <Controller
                    name="tags"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <div className="text-white">
                        <AsyncCreatableSelect
                          {...field}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "#171212",
                              outline: "none",
                              border: "none",
                              padding: "5px",
                            }),
                            input: (baseStyles) => ({
                              ...baseStyles,
                              color: "white",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: state.isFocused ? "white" : "",
                              color: state.isFocused ? "black" : "",
                            }),
                            menu: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: "#171212",
                            }),
                            multiValue: (baseStyles) => ({
                              ...baseStyles,
                              background: "black",
                              color: "white",
                            }),
                            multiValueLabel: (baseStyles) => ({
                              ...baseStyles,
                              color: "white",
                            }),
                          }}
                          components={animatedComponents}
                          isMulti
                          cacheOptions
                          defaultOptions
                          // loadOptions={promiseOptions}
                          loadOptions={(inputValue, callback) =>
                            promiseOptions(inputValue, callback)
                          }
                          {...field}
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="mt-16 flex justify-around">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="btn btn-error rounded-md px-8"
                    onClick={() => {
                      reset();
                      setImageFile(null);
                      setSelectedImageURL(null);
                    }}>
                    Remove
                  </button>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary rounded-md px-8">
                    {isLoading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-1 border-dashed rounded-xl border-gray-600">
          <label>
            <div className="flex flex-col items-center justify-center h-full">
              <div
                className={`flex flex-col mt-12 justify-center items-center`}>
                <p className="font-bold text-2xl">
                  <UploadCloud className="w-12 h-12" />
                </p>
                <p className="text-xl font semibold mt-4">Click to upload</p>
              </div>

              <p className={`text-gray-300 text-md mt-16 p-4`}>
                Use high-quality JPG, JPEG,WEBP, PNG, GIF or TIFF less than 20MB
              </p>
            </div>
            <input
              type="file"
              name="uploadedFile"
              onChange={uploadImage}
              className="w-0 h-0"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
