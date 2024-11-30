"use client";

import useTheme from '@/hooks/useTheme'

const Container = ({customClasses, children}) => {
    const { theme, mounted } = useTheme()

    if (!mounted) return null
  return (
    <div className={`${customClasses} container-background ${theme}`}>
      {children}
    </div>
  )
}

export default Container
