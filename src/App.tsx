import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BackToTop } from "./components/BackToTop";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Works } from "./pages/Works";
import { ThemeProvider } from "./theme";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
