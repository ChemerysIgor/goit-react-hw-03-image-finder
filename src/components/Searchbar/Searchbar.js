import { Formik, ErrorMessage } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { Component } from 'react';
import { Header, ContactsForm, Input, SearchButton } from './SearchbarStyled';
import { BsSearch } from 'react-icons/bs';

const schema = yup.object().shape({ search: yup.string().required() });

export class Searchbar extends Component {
  state = {
    search: '',
  };
  handleWord = evt => {
    this.setState({ search: evt.target.value });
  };

  render() {
    const handleSubmit = e => {
      e.preventDefault();
      this.props.onForm(this.state.search);
      // this.setState({ search: '' });
    };
    return (
      <Header>
        <Formik validationSchema={schema}>
          <ContactsForm onSubmit={handleSubmit}>
            <SearchButton type="submit" >
              <BsSearch />
            </SearchButton>

            <Input
              name="search"
              value={this.state.search}
              onChange={this.handleWord}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <ErrorMessage name="search" />
          </ContactsForm>
        </Formik>
      </Header>
    );
  }
}
