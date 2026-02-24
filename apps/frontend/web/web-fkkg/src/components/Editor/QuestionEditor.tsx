import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Code 
} from 'lucide-react';

interface QuestionEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ 
  content, 
  onChange, 
  placeholder = 'Tulis butir soal di sini...' 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const MenuBar = () => {
    return (
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-200'}`}
          title="Tebal"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-200'}`}
          title="Miring"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('code') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-200'}`}
          title="Kode"
        >
          <Code size={18} />
        </button>
        
        <div className="w-px h-6 bg-slate-200 mx-1" />
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-200'}`}
          title="Daftar Simbol"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-200'}`}
          title="Daftar Angka"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('blockquote') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:bg-slate-200'}`}
          title="Kutipan"
        >
          <Quote size={18} />
        </button>
        
        <div className="flex-1" />
        
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30"
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500 transition-all bg-white overflow-hidden shadow-sm">
      <MenuBar />
      <EditorContent 
        editor={editor} 
        className="p-6 min-h-[200px] prose prose-slate max-w-none focus:outline-none"
      />
    </div>
  );
};

export default QuestionEditor;
