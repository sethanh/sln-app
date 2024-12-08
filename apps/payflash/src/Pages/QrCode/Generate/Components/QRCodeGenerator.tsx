import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import JsBarcode from 'jsbarcode';

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [codeType, setCodeType] = useState<'qrcode' | 'barcode'>('qrcode');
  const barcodeRef = useRef<SVGSVGElement>(null);

  const generateBarcode = (value: string) => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: 'CODE128', // Định dạng Barcode
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: true, // Hiển thị giá trị bên dưới mã vạch
      });
    }
  };

  const handleGenerate = () => {
    if (codeType === 'barcode' && inputValue.trim()) {
      generateBarcode(inputValue);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>QR Code & Barcode Generator</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Nhập dữ liệu:</strong>
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập dữ liệu để tạo mã"
          style={{
            marginLeft: '10px',
            padding: '5px',
            fontSize: '16px',
            width: '300px',
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Loại mã:</strong>
        </label>
        <select
          value={codeType}
          onChange={(e) => setCodeType(e.target.value as 'qrcode' | 'barcode')}
          style={{ marginLeft: '10px', padding: '5px', fontSize: '16px' }}
        >
          <option value="qrcode">QR Code</option>
          <option value="barcode">Barcode</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Generate
      </button>

      <div style={{ marginTop: '30px' }}>
        <h3>Kết quả:</h3>
        {codeType === 'qrcode' ? (
          <div style={{ padding: '10px', background: '#fff', display: 'inline-block' }}>
            <QRCode value={inputValue || ' '} size={150} />
          </div>
        ) : (
          <svg ref={barcodeRef}></svg>
        )}
      </div>
    </div>
  );
};

export { QRCodeGenerator };
