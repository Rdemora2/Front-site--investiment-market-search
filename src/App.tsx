import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="group">
          <img 
            src={viteLogo} 
            className="h-24 p-6 transition-all will-change-auto group-hover:drop-shadow-[0_0_2em_#646cffaa]" 
            alt="Vite logo" 
          />
        </a>
        <a href="https://react.dev" target="_blank" className="group">
          <img 
            src={reactLogo} 
            className="h-24 p-6 transition-all will-change-auto group-hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin" 
            alt="React logo" 
            style={{ animationDuration: '20s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-8">Vite + React</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Counter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button variant="default" size="lg" onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </Button>
          <p className="text-center text-muted-foreground">
            Edit <code className="text-primary font-mono bg-muted p-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground w-full text-center">
            Click on the Vite and React logos to learn more
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
