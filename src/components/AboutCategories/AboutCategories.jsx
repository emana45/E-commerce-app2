import React from 'react'
import Categories from '../Categories/Categories'
import { Helmet } from 'react-helmet'

export default function AboutCategories() {
  return (
    <>
    <Categories/>
    <Helmet>
        <title>Categories Component</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    </>
  )
}
