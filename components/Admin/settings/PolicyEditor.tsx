'use client'
import { useData } from "@/contexts/PageContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateAdmin } from "@/utils/api";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Essentials,
    Alignment,
    Autoformat,
    BlockQuote,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    Heading,
    HorizontalLine,
    Image,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter,
    Italic,
    Link,
    List,
    Mention,
    Paragraph,
    MediaEmbed,
    SourceEditing,
    Strikethrough,
    Underline,
    Table,
    TableToolbar,
    TableProperties,
    TableColumnResize,
    TextTransformation,
    TodoList,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    FontSize,
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css';
import { useState } from "react";
import { errorAlert, successAlert } from "@/components/ToastGroup";

export interface PolicySettingProps {
    policy: string;
}

const PolicyEditor = () => {
    const { adminData, setAdminData } = useData();
    const [content, setContent] = useState<string>(adminData?.policy || '')

    const { setValue, handleSubmit, reset } = useForm<PolicySettingProps>();

    const onSubmit: SubmitHandler<PolicySettingProps> = async (_data) => {
        try {
            const data = await updateAdmin(_data)
            setAdminData(data)
            successAlert('Update Policy Successfully')
        } catch {
            errorAlert('Failed to update policy')
        }
    }

    return (
        <div className="mx-auto my-2">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Policy
                        </h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5.5">
                                {typeof window !== 'undefined' && (
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            plugins: [
                                                Alignment,
                                                Autoformat,
                                                BlockQuote,
                                                Bold,
                                                CloudServices,
                                                Code,
                                                CodeBlock,
                                                Essentials,
                                                FontSize,
                                                Heading,
                                                HorizontalLine,
                                                Image,
                                                ImageCaption,
                                                ImageInsert,
                                                ImageResize,
                                                ImageStyle,
                                                ImageToolbar,
                                                ImageUpload,
                                                MediaEmbed,
                                                Base64UploadAdapter,
                                                Italic,
                                                Link,
                                                List,
                                                Underline,
                                                Mention,
                                                Paragraph,
                                                SourceEditing,
                                                Strikethrough,
                                                Table,
                                                TableToolbar,
                                                TableProperties,
                                                TableColumnResize,
                                                TextTransformation,
                                                TodoList,
                                            ],
                                            toolbar: [
                                                'undo',
                                                'redo',
                                                '|',
                                                'heading',
                                                '|',
                                                'bold',
                                                'italic',
                                                'alignment',
                                                'strikethrough',
                                                'underline',
                                                'code',
                                                'fontsize',
                                                '|',
                                                'bulletedList',
                                                'numberedList',
                                                'todoList',
                                                '|',
                                                'link',
                                                'uploadImage',
                                                'mediaEmbed',
                                                'insertTable',
                                                'blockQuote',
                                                'codeBlock',
                                                'horizontalLine',
                                            ],
                                            alignment: {
                                                options: ['left', 'center', 'right', 'justify'] // Specify the alignment options
                                            },
                                            image: {
                                                resizeOptions: [
                                                    {
                                                        name: 'resizeImage:original',
                                                        label: 'Default image width',
                                                        value: null,
                                                    },
                                                    {
                                                        name: 'resizeImage:50',
                                                        label: '50% page width',
                                                        value: '50',
                                                    },
                                                    {
                                                        name: 'resizeImage:75',
                                                        label: '75% page width',
                                                        value: '75',
                                                    },
                                                ],
                                                toolbar: [
                                                    'imageTextAlternative',
                                                    'toggleImageCaption',
                                                    '|',
                                                    'imageStyle:inline',
                                                    'imageStyle:wrapText',
                                                    'imageStyle:breakText',
                                                    '|',
                                                    'resizeImage',
                                                ],
                                                insert: {
                                                    integrations: ['url'],
                                                },
                                            },
                                            table: {
                                                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties'],
                                            }
                                        }}
                                        data={content}
                                        onChange={(event, editor) => {
                                            const data = editor.getData()
                                            setContent(data)
                                            setValue('policy', data)
                                        }}
                                    />
                                )}
                            </div>

                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="button"
                                    onClick={() => {
                                        reset({
                                            policy: adminData?.policy || ''
                                        })
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PolicyEditor;