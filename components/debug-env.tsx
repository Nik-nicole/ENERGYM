"use client"

import { useEffect, useState } from "react"

export default function DebugEnv() {
  const [envVars, setEnvVars] = useState({
    url: "",
    key: "",
    nodeEnv: ""
  })

  useEffect(() => {
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "UNDEFINED",
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "DEFINED" : "UNDEFINED",
      nodeEnv: process.env.NODE_ENV || "UNDEFINED"
    })
  }, [])

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
      <h3 className="font-bold text-red-800 mb-2">DEBUG - Variables de Entorno:</h3>
      <ul className="text-sm space-y-1">
        <li><strong>NODE_ENV:</strong> {envVars.nodeEnv}</li>
        <li><strong>SUPABASE_URL:</strong> {envVars.url}</li>
        <li><strong>SUPABASE_ANON_KEY:</strong> {envVars.key}</li>
      </ul>
    </div>
  )
}
