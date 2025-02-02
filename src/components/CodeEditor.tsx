import { useCallback, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsIFrame } from '@/hooks/useIsIFrame';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  readOnly?: boolean;
  onCodeChange?: (code: string) => void;
}

const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  language: initialLanguage = 'javascript',
  readOnly = false,
  onCodeChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState('');
  const isIframe = useIsIFrame();

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onCodeChange?.(value);
    }
  };

  const executeCode = useCallback(() => {
    setOutput('');
    
    if (language === 'javascript') {
      try {
        // Create a sandbox environment
        const sandbox = document.createElement('iframe');
        sandbox.style.display = 'none';
        document.body.appendChild(sandbox);
        
        // Capture console.log output
        const originalConsoleLog = sandbox.contentWindow?.console.log;
        let output = '';
        
        if (sandbox.contentWindow) {
          sandbox.contentWindow.console.log = (...args) => {
            output += args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\n';
            originalConsoleLog?.apply(console, args);
          };

          // Execute the code
          const result = sandbox.contentWindow.eval(code);
          if (result !== undefined) {
            output += result;
          }
        }
        
        setOutput(output);
        document.body.removeChild(sandbox);
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else if (language === 'html') {
      try {
        const previewWindow = window.open('', '_blank');
        if (previewWindow) {
          previewWindow.document.write(code);
          previewWindow.document.close();
        }
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else {
      setOutput(`Execution for ${language} is not implemented yet.`);
    }
  }, [code, language]);

  useEffect(() => {
    // Reset output when language changes
    setOutput('');
  }, [language]);

  if (isIframe) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select
          value={language}
          onValueChange={(value) => setLanguage(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={executeCode} disabled={readOnly}>
          Run Code
        </Button>
      </div>

      <Card className="min-h-[300px] overflow-hidden">
        <Editor
          height="300px"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            readOnly,
            scrollBeyondLastLine: false,
          }}
        />
      </Card>

      {output && (
        <Card className="p-4 bg-black text-white font-mono">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;