// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { BubbleChat } from 'flowise-embed-react'; // Import BubbleChat

import * as Fathom from 'fathom-client'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import posthog from 'posthog-js'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import { bootstrap } from '@/lib/bootstrap-client'
import {
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <>
      <BubbleChat
        chatflowid="2e441122-be00-42bb-8aa8-fde5e0d4851e"
        apiHost="https://flowise-studio.moodmnky.com"
        theme={{
          button: {
            backgroundColor: "#2F3437",
            right: 20,
            bottom: 20,
            size: "medium",
            iconColor: "white",
            customIconSrc: "https://cdn.discordapp.com/attachments/1083532452347269220/1192627725140238346/authority-avatar-nobg4.png",
          },
          chatWindow: {
            welcomeMessage: "Welcome back Master Slade! How can I be of service?",
            backgroundColor: "#2F3437",
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: "#2F3437",
            botMessage: {
              backgroundColor: "#000000",
              textColor: "#FFFFFF",
              showAvatar: true,
              avatarSrc: "https://cdn.discordapp.com/attachments/1083532452347269220/1192627725140238346/authority-avatar-nobg4.png",
            },
            userMessage: {
              backgroundColor: "#C3061A",
              textColor: "#ffffff",
              showAvatar: true,
              avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
            },
            textInput: {
              placeholder: "Type your question",
              backgroundColor: "#2F3437",
              textColor: "#ffffff",
              sendButtonColor: "#C3061A",
            }
          }
        }}
      />
  <Component {...pageProps} />
  </>
  );
}

