'use client'
import { useData } from "@/contexts/PageContext"
import 'ckeditor5/ckeditor5.css';

const Terms = () => {
    const { metaData } = useData();

    return (
        <div className="no-border-editor ck-content">
            <div className="ck-eidotr__editable_inline" dangerouslySetInnerHTML={{ __html: metaData?.terms || '' }} />
        </div>
    )
}

export default Terms