import * as React from 'react';
import { lazyLoad } from 'fuse-tools';

export default class LazyComponent extends React.Component {
  private state: any;
  private setState: any;
  private props: any;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps: any) {
    let name = nextProps.bundle;
    if (name) {
      this.lazyLoad(name);
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  renderLazyComponent() {
    if (this.state.LazyComponent) {
      const MyComponent = this.state.LazyComponent;
      return <MyComponent />;
    }
  }

  async lazyLoad(name) {
    let target;
    if (name === 'about') {
      target = await import('../../routes/about/About');
    }
    if (name === 'contact') {
      target = await import('../../routes/contact/Contact');
    }
    this.setState({ LazyComponent: target.default });
  }
  render() {
    return <div className="h-100 w-100">{this.renderLazyComponent()}</div>;
  }
}
