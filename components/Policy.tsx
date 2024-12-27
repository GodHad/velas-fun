'use client'
import { useData } from "@/contexts/PageContext"
import 'ckeditor5/ckeditor5.css';

const Policy = () => {
    const { metaData } = useData();

    return (
        <div className="no-border-editor ck-content">
            <div className="ck-eidotr__editable_inline" dangerouslySetInnerHTML={{ __html: metaData?.policy || '' }} />
        </div>
    )
}

export default Policy