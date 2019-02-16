/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from "react";
import { MDXProvider } from "@mdx-js/tag";
import Link from "next/link";

import MarkdownElements from "./markdown-elements";

export default ({ children }) => (
  <React.Fragment>
    <MDXProvider components={MarkdownElements}>{children}</MDXProvider>
  </React.Fragment>
);
