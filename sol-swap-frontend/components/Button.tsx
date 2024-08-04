'use client'

type ButtonProps = {
  px: string
  py: string
  color: 'blue' | 'red' | 'yellow' | 'green' | 'black' | 'gray'
  text: string
  textColor: string
  onClick?: any
}

const colorClasses = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  black: 'bg-black',
  gray: 'bg-gray'
}

export const Button: React.FC<ButtonProps> = ({
  px,
  py,
  color,
  text,
  textColor,
  onClick,
}) => {
  return (
    <button
      className={`px-${px} py-${py} ${colorClasses[color]}-500 text-${textColor} rounded-lg`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}