import React from 'react';

interface FieldSetProps {
  text: string,
  children: React.ReactNode
}

const FieldSet = ({text, children} : FieldSetProps) => {
  return (
    <fieldset className="border-b pb-3 rounded-xl">
      <legend className="text-white font-bold px-4 pt-3 text-2xl">
        <h1>{text}</h1>
      </legend>
      {children}
    </fieldset>
  );
};

export default FieldSet;