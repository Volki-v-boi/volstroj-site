import { Component } from "react";

// Если что-то внутри падает с ошибкой рендера — без этой страховки
// React гасит ВЕСЬ сайт белым экраном, а не только сломанный блок.
// Оборачиваем в неё каждый раздел, который зависит от бэкенда (fetch).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Sekcja nie została załadowana:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
