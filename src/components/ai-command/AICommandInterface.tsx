import {
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
} from "react"

import { motion } from "framer-motion"
import {
  Mic,
  MicOff,
  Loader2,
  AlertTriangle,
} from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { useSettingsStore } from "@/store"
import { useAIConversationStore } from "@/store/aiConversationStore"

import { generateAIResponse } from "../../ai/core/ollama"
import { NEXUS_PERSONALITY } from "../../ai/personality/nexus"

import { useStreamingText } from "@/hooks/useStreamingText"

import {
  AICoreSphere,
  type CoreState,
} from "./AICoreSphere"

import { VoiceWaveform } from "./VoiceWaveform"
import { AIResponsePanel } from "./AIResponsePanel"
import { ConversationHistory } from "./ConversationHistory"
import { QuickCommands } from "./QuickCommands"
import { AIStatusBar } from "./AIStatusBar"

import type { QuickCommand } from "@/constants/aiCommands"

import "@/styles/AICommand.css"



const MIC_LABELS: Record<CoreState,string> = {

  IDLE:"Tap To Speak",

  LISTENING:"Listening...",

  THINKING:"Thinking...",

  SPEAKING:"Speaking...",

  ERROR:"Error — Retry"

}



export const AICommandInterface = memo(()=>{


const [state,setState] =
useState<CoreState>("IDLE")


const [time,setTime] =
useState(new Date())


const [transcript,setTranscript] =
useState("")


const [response,setResponse] =
useState("")


const [streamActive,setStreamActive] =
useState(false)


const [supported,setSupported] =
useState(true)



const recognitionRef =
useRef<any>(null)


const stateRef =
useRef<CoreState>("IDLE")



const {user}=useAuth()


const settings =
useSettingsStore(s=>s.settings)


const entries =
useAIConversationStore(s=>s.entries)


const addEntry =
useAIConversationStore(s=>s.addEntry)



const commander =
user?.fullName?.split(" ")[0]
||
"Commander"



const {
 displayed,
 isComplete
}=useStreamingText(
 response,
 streamActive
)



useEffect(()=>{

stateRef.current=state

},[state])



useEffect(()=>{

const timer=setInterval(()=>{

setTime(new Date())

},1000)


return ()=>clearInterval(timer)

},[])





const speak = useCallback(
(text:string)=>{


setResponse(text)

setStreamActive(true)

setState("SPEAKING")


addEntry({

role:"ai",

text,

module:"NEXUS CORE"

})



if(window.speechSynthesis){


window.speechSynthesis.cancel()


const utter =
new SpeechSynthesisUtterance(text)



utter.rate=0.95

utter.pitch=0.9



utter.onend=()=>{

setState("IDLE")

setStreamActive(false)

}



window.speechSynthesis.speak(
utter
)


}


},
[addEntry]
)







const askAI =
useCallback(
async(
question:string,
module?:string
)=>{


if(!question)return



setState("THINKING")

setTranscript("")



addEntry({

role:"user",

text:question,

module

})



try{


const answer =
await generateAIResponse({

prompt:`

${NEXUS_PERSONALITY}


Commander:
${commander}


User request:

${question}



Respond as a futuristic AI command system.

Be concise.

Be intelligent.

Be helpful.

`

})



speak(answer)



}

catch(err){


console.error(err)


speak(
"NEXUS CORE CONNECTION FAILED. CHECK OLLAMA."
)


setState("ERROR")


setTimeout(()=>{

setState("IDLE")

},3000)


}



},
[
commander,
addEntry,
speak
]
)








useEffect(()=>{


const w:any=window


const SpeechRecognition =
w.SpeechRecognition ||
w.webkitSpeechRecognition



if(!SpeechRecognition){

setSupported(false)

return

}



const recognition =
new SpeechRecognition()



recognition.continuous=false

recognition.interimResults=true



recognition.lang =
settings.language==="es"
?
"es-ES"
:
"en-US"





recognition.onresult =
(event:any)=>{


let finalText=""


for(
let i=event.resultIndex;
i<event.results.length;
i++
){

const text =
event.results[i][0].transcript



if(event.results[i].isFinal)

finalText+=text


else

setTranscript(text)


}



if(finalText)

askAI(finalText)



}




recognition.onerror=()=>{


setState("ERROR")


setTimeout(
()=>setState("IDLE"),
3000
)


}



recognition.onend=()=>{


if(
stateRef.current==="LISTENING"
)

setState("IDLE")

}



recognitionRef.current =
recognition



return()=>{

recognition.abort()

}


},
[
settings.language,
askAI
]
)









const toggleMic =
useCallback(()=>{


if(!supported)return



if(state==="LISTENING"){

recognitionRef.current?.stop()

setState("IDLE")

return

}



setResponse("")

setTranscript("")



try{


recognitionRef.current?.start()

setState("LISTENING")


}
catch{


setState("ERROR")

}



},
[
state,
supported
]
)








const quickCommand =
useCallback(
(cmd:QuickCommand)=>{


if(
state==="THINKING" ||
state==="SPEAKING"
)

return



askAI(
cmd.prompt,
cmd.label
)


},
[state,askAI]
)





const greeting=()=>{


const h=time.getHours()


if(h<12)

return `GOOD MORNING ${commander.toUpperCase()}`


if(h<17)

return `GOOD AFTERNOON ${commander.toUpperCase()}`


return `GOOD EVENING ${commander.toUpperCase()}`


}





const busy =
state==="THINKING" ||
state==="SPEAKING"





let micClass=
"ai-mic-button"



if(state==="LISTENING")
micClass+=" is-listening"



if(state==="THINKING")
micClass+=" is-processing"



if(state==="SPEAKING")
micClass+=" is-speaking"








return (

<div className="ai-command-interface">



<header className="ai-command-header">


<div>


<h1 className="ai-command-greeting">

{greeting()}

</h1>



<p className="ai-command-subtitle">

NEXUS CORE ONLINE ·
{time.toLocaleTimeString()}

</p>


</div>



<AIStatusBar state={state}/>


</header>







<div className="ai-command-body">



<aside className="ai-command-sidebar">

<ConversationHistory
entries={entries}
/>

</aside>







<main className="ai-command-main">



<AICoreSphere
state={state}
/>



<VoiceWaveform
state={state}
/>





<AIResponsePanel


displayedText={displayed}


isStreaming={streamActive}


isComplete={isComplete}


visible={
!!response ||
streamActive
}


/>






{
transcript &&
state==="LISTENING"
&&

<motion.p
className="ai-live-transcript"
animate={{opacity:1}}
>

&gt; {transcript}

</motion.p>

}







<div className="ai-mic-section">



<button

disabled={busy}

onClick={toggleMic}

className={micClass}

>


{
state==="LISTENING"

?

<MicOff/>

:

state==="THINKING"

?

<Loader2 className="ai-mic-spinner"/>

:

state==="ERROR"

?

<AlertTriangle/>

:

<Mic/>

}


</button>



<span className="ai-mic-label">

{
MIC_LABELS[state]
}

</span>


</div>







<QuickCommands

onCommand={quickCommand}

disabled={busy}

/>



</main>


</div>



</div>

)


})



AICommandInterface.displayName =
"AICommandInterface"