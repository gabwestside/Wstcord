import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ2OTY3OSwiZXhwIjoxOTU5MDQ1Njc5fQ.VVe8jYwYVPp9gjsyGk4sfvZIYvHuO-x3qadZV69muIw';
const SUPABASE_URL = 'https://nixjopnfanoejkdifnfo.supabase.co';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

fetch('$(SUPABASE_URL)/rest/v1/messages?select=>', {
  header: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
  }
})
  .then((res) => {
    return res.json();
  })
  .then((response) => {
    console.log(response);
  });

supabaseClient
  .from('messages')
  .select('*')
  .then((supabaseData) => {
    console.log('Dados do nosso banco de dados: ', supabaseData);
  });



export default function ChatPage() {
  const [mensagem, setMensagem] = useState('');
  const [messageList, setMessageList] = useState([]);

  function handleNewMessage(newMessage) {
    const message = {
      id: messageList.length,
      from: 'chrisalid',
      text: newMessage,
    };
    setMessageList([
      message,
      ...messageList
    ]);
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList messages={messageList} />

          {/* {messageList.map((mensagemAtual) => {
            return <li key={mensagemAtual.id}>
                {mensagemAtual.from}: {mensagemAtual.text}
            </li>;
          })} */}

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const value = event.target.value;
                setMensagem(value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(mensagem);
                  setMensagem('');
                }
              }}
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            ></TextField>
            <Button
              variant='tertiary'
              colorVariant='neutral'
              label='Send'
              // onClick={(event) => {
              //   const event = handleNewMessage(mensagem);
              //   setMensagem('');
              // }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant='heading5'>Chat</Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href='/'
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log(props);

  return (
    <Box
      tag='ul'
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {props.messages.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag='li'
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/chrisalid.png`}
              />
              <Text
                tag='strong'
                // styleSheet={{
                //   fontWeight: 'bold',
                //   fontSize: '1.2rem',
                // }}
              >
                {mensagem.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag='span'
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.text}
          </Text>
        );
      })}
    </Box>
  );
}
