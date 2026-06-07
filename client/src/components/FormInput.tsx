import type { ChangeEvent } from 'react'

function FormInput({ label, type, value, onChange, placeholder, icon } : { label: string, type: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, placeholder: string, icon?: React.ReactNode }) {
  return (
    <div className="mb-[15px]">
      <label className="block mb-2 font-medium">{label}</label>
        <div className="relative">
            {icon && (
            <div className="absolute left-[12px] top-1/2 -translate-y-1/2 text-movie-text-sec">
                {icon}
            </div>
            )}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-2.5 pr-10 border border-[#b4b4b4] bg-movie-surface text-movie-text-main rounded box-border focus:outline-none placeholder:text-movie-text-sec ${
                    icon ? "pl-10" : "pl-3"
                }`}
            />
        </div>
    </div>
  );
}

export default FormInput;