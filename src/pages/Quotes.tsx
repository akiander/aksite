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
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    const apiData: any = await API.graphql({ query: listQuotes });
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
    });
    fetchQuotes();
    event.target.reset();
  }

  async function deleteQuote({ id }: IQuote) {
    const newQuotes = quotes.filter((quote:IQuote) => quote.id !== id);
    setQuotes(newQuotes);
    await API.graphql({
      query: deleteQuoteMutation,
      variables: { input: { id } },
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