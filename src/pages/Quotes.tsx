import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listQuotes } from "../graphql/queries";
import {
  createQuote as createQuoteMutation,
  deleteQuote as deleteQuoteMutation,
} from "../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import defaultQuotes from '../data/quotes-default.json';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface IQuote {
  id: string
  userId: string
  quote: string
  author: string
  category: string
}

interface IEvent {
  target: any
  preventDefault: Function
}

const Quotes = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [quotes, setQuotes] = useState(Array<IQuote>);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    const apiData: any = await API.graphql({ query: listQuotes, 
      variables: { limit: 500, 
        filter: {
          userId: {
            eq: user?.username
          }
        }
      },
      // authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    });
    const quotesFromAPI = apiData.data.listQuotes.items;
    setQuotes(quotesFromAPI);
  }

  async function createQuote(event:IEvent) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      quote: form.get("quote"),
      userId: user?.username || '',
      author: form.get("author"),
      category: form.get("category"),
    };
    await API.graphql({
      query: createQuoteMutation,
      variables: { input: data },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    });
    fetchQuotes();
    event.target.reset();
  }

  async function createDefaultQuotes() {

    // var defaultQuoteList: Array<any> = JSON.parse(defaultQuotes);

    defaultQuotes.forEach(async defaultQuote => {
      if (quotes.map(q => q.quote).indexOf(defaultQuote.Text) > -1) {
        console.log('Ignoring:', defaultQuote.Text)
      }
      else {
        const data = {
          quote: defaultQuote.Text,
          userId: user?.username || '',
          author: defaultQuote.Author,
          category: defaultQuote.CategoriesAsString,
        };
        console.log('inserting:', data)
        await API.graphql({
          query: createQuoteMutation,
          variables: { input: data },
          authMode: GRAPHQL_AUTH_MODE.AWS_IAM
        });
      }
    });

    fetchQuotes();
  }

  async function deleteQuote({ id }: IQuote) {
    const newQuotes = quotes.filter((quote:IQuote) => quote.id !== id);
    setQuotes(newQuotes);
    await API.graphql({
      query: deleteQuoteMutation,
      variables: { input: { id } },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Quotes</Heading>
      <View as="form" margin="3rem 0" onSubmit={createQuote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="quote"
            placeholder="Quote Name"
            label="Quote Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="author"
            placeholder="Quote Author"
            label="Quote Author"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="category"
            placeholder="Quote Category"
            label="Quote Category"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Quote
          </Button>
          <Button onClick={createDefaultQuotes}>
            Load Initial Quotes
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Quotes</Heading>
      <View margin="3rem 0">
        {quotes.map((quote:IQuote) => (
          <Flex
            key={quote.id || quote.quote}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {quote.quote}
            </Text>
            <Text as="span">{quote.category}</Text>
            <Text as="span">{quote.author}</Text>
            <Button variation="link" onClick={() => deleteQuote(quote)}>
              Delete quote
            </Button>
          </Flex>
        ))}
      </View>

    </View>
  );
};

export default withAuthenticator(Quotes);