import UserContext from "@/contexts/UserContext";
import { updateUser, uploadImage } from "@/utils/api";
import Image from "next/image";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
    username: string;
    bio: string;
    avatar: File | null;
}

export default function EditModal({ userId, closeModal }: { userId: string, closeModal: () => void }) {
    const { user, setUser } = useContext(UserContext);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            username: user.name,
            bio: user.bio
        }
    });
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        let url: string | undefined;
        if (previewSrc)
            url = await uploadImage(previewSrc);

        const user = await updateUser(userId, data.username, data.bio, url);
        if (user) {
            setUser(user);
            clearImage();
            closeModal();
        }
    }

    const handleFileChange = (files: FileList | null) => {
        if (!files || files.length === 0) {
            console.error("No file selected");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewSrc(reader.result as string);
        };
        reader.readAsDataURL(files[0] as Blob);
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const files = event.dataTransfer.files;
        handleFileChange(files);
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const clearImage = () => {
        setValue("avatar", null);
        setPreviewSrc(null)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[1000] ng-star-inserted">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md card">
                <div className="modal-header flex justify-between items-center py-3 px-6 border-b border-primary">
                    <h5 className="text-lg font-semibold">Edit Profile</h5>
                    <span className="cursor-pointer text-sm hover:border-primary" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </span>
                </div>
                <div className="modal-body p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <div className="text-start">
                                <label className="block text-sm font-medium">Profile Image</label>
                            </div>
                            <div className="col-span-12 sm:col-span-3 lg:col-span-2 mb-5 sm:mb-0">
                                <label htmlFor="logo" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">Upload File <span className="error text-red-600">*</span></label>
                                <div className="center flex flex-col items-center justify-center w-full border dark:border-gray-700 border-gray-200 rounded-xl bg-black-2 text-gray-700 text-sm md:text-base" onDrop={handleDrop} onDragOver={handleDragOver}>
                                    <div className="flex flex-col items-center gap-4 justify-center p-4 md:p-6">
                                        <Image src="/images/upload.svg" alt="Upload Image" width="50" height="50" className="cursor-pointer" onClick={() => document.getElementById('avatar')?.click()} />
                                        <p className="text-center text-xs font-light text-black-6 leading-6 text-body-color">
                                            <label htmlFor="avatar" className="pl-1 underline cursor-pointer" >
                                                Click to Upload
                                            </label> (or) Drag and Drop
                                        </p>
                                        <input
                                            id="avatar"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            {...register("avatar")}
                                            onChange={(e) => { console.log(e.target.files); handleFileChange(e.target.files); }}
                                        />
                                    </div>
                                    {previewSrc &&
                                        <div className="flex flex-col items-center group gap-4 justify-center hover:before:border hover:before:border-blue-1 rounded-xl hover:before:rounded-xl relative hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:bg-black hover:before:opacity-80 hover:before:w-full hover:before:h-full ng-star-inserted">
                                            <Image
                                                width={155}
                                                height={168}
                                                alt="Preview Image"
                                                src={previewSrc}
                                                className="w-full h-[168px] object-cover rounded-xl ng-star-inserted"
                                            />
                                            <div className="gap-4 absolute hidden group-hover:flex transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                                <button className="rounded-lg bg-white w-8 h-8 flex justify-center items-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" onClick={clearImage}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M2.02637 4H14.3689" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.65527 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.7373 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.79785 4L3.56926 13.5997C3.56926 14.024 3.7318 14.431 4.02114 14.731C4.31047 15.0311 4.70289 15.1997 5.11207 15.1997H11.2833C11.6925 15.1997 12.0849 15.0311 12.3743 14.731C12.6636 14.431 12.8261 14.024 12.8261 13.5997L13.5975 4" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.02246 3.99971V1.59978C6.02246 1.38761 6.10373 1.18414 6.2484 1.03411C6.39307 0.884088 6.58928 0.799805 6.79387 0.799805H9.8795C10.0841 0.799805 10.2803 0.884088 10.425 1.03411C10.5696 1.18414 10.6509 1.38761 10.6509 1.59978V3.99971" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {errors.avatar && <p className="text-red-600">{errors.avatar.message}</p>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="block text-sm font-mediums">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                className="border rounded-xl placeholder:text-body-color text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 dark:border-gray-700 border-gray-200 bg-transparent"
                                {...register('username', { required: 'Username is required' })}
                            />
                            {errors.username && <p className="text-red-600">{errors.username.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bio" className="block text-sm font-medium">Bio</label>
                            <textarea
                                id="bio"
                                placeholder="Tell us about yourself"
                                className="border rounded-xl bg-black-2 placeholder:text-gray-7 text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 h-[122px] mb-5 md:mb-2 dark:border-gray-700 border-gray-200 bg-transparent"
                                {...register('bio')}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="rounded-lg text-gray-3 text-base md:text-lg px-7 py-3 w-[160px] md:w-[200px] focus:outline-0 leading-6 text-center disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-primary text-white text-base md:text-lg px-7 py-3 w-[160px] md:w-[200px] focus:outline-0 leading-6 text-center disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}