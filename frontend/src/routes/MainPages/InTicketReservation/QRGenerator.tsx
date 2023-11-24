import React from 'react';
import QRCode from 'qrcode.react';

interface QRGeneratorProps {
  data: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ data }) => {
  return <QRCode value={data} />;
};

export default QRGenerator;
