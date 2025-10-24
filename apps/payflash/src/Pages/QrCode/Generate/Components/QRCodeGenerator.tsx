import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import JsBarcode from 'jsbarcode';
import { Block, ButtonCommon, FlexBox, TextCommon } from '@my-monorepo/ui';
import { Input, Select } from 'antd';
const { Option } = Select;

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [codeType, setCodeType] = useState<'qrcode' | 'barcode'>('qrcode');
  const [generated, setGenerated] = useState<boolean>(false); // ✅ kiểm soát hiển thị
  const barcodeRef = useRef<SVGSVGElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const generateBarcode = (value: string) => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: true,
      });
    }
  };

  const handleGenerate = () => {
    if (!inputValue.trim()) {
      alert('Vui lòng nhập dữ liệu trước.');
      return;
    }

    if (codeType === 'barcode') {
      generateBarcode(inputValue);
    }

    setGenerated(true); // ✅ chỉ hiển thị sau khi nhấn Generate
  };

  const handleDownload = () => {
    if (!generated) return alert('Vui lòng nhấn "Generate" trước khi tải.');

    if (codeType === 'qrcode') {
      const svg = qrRef.current?.querySelector('svg');
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const scale = 4;

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);

        const link = document.createElement('a');
        link.download = `${timestamp}_qrcode.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };

      img.src = url;
    } else {
      const svg = barcodeRef.current;
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const link = document.createElement('a');
        link.download = `${inputValue}_barcode.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };

      img.src = url;
    }
  };

  return (
    <Block width={420}>
      <FlexBox direction='column' flex='none' gap={18}>
        <TextCommon fontWeight={600} fontSize={20}>QR Code & Barcode Generator</TextCommon>
        <FlexBox direction='column' flex='none' gap={4}>
          <TextCommon fontWeight={500} >Nhập dữ liệu:</TextCommon>
          <Input
            placeholder="Nhập dữ liệu để tạo mã"
            onChange={(e) => {
              setInputValue(e.target.value);
              setGenerated(false);
            }} />
        </FlexBox>

        <FlexBox direction='column' flex='none' gap={4}>
          <TextCommon fontWeight={500}>Loại mã:</TextCommon>
          <Select
            value={codeType}
            onChange={(v) => {
              setCodeType(v);
              setGenerated(false);
            }}
          >
            <Option value="qrcode">QR Code</Option>
            <Option value="barcode">Barcode</Option>
          </Select>
        </FlexBox>
        <FlexBox flex='none' gap={12}>
          <ButtonCommon
            onClick={handleGenerate}
            type='primary'
          >
            Tạo mã
          </ButtonCommon>

          <ButtonCommon
            onClick={handleDownload}
          >
            Tải về
          </ButtonCommon>
        </FlexBox>

        {generated && (
          <FlexBox alignItems='center' justifyContent='center'>
            {codeType === 'qrcode' ? (
              <div
                ref={qrRef}
                style={{
                  padding: '10px',
                  background: '#fff',
                  display: 'inline-block',
                }}
              >
                <QRCode value={inputValue || ' '} size={150} />
              </div>
            ) : (
              <svg ref={barcodeRef}></svg>
            )}
          </FlexBox>
        )}
      </FlexBox>
    </Block>
  );
};

export { QRCodeGenerator };
