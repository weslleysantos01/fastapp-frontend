# FestApp - Frontend Interface (SaaS)

Esta é a interface do **FestApp**, uma aplicação SaaS voltada para a gestão profissional de eventos. O frontend foi desenvolvido com **React.js**, priorizando uma interface reativa, segura e com alta performance para o usuário final.

---

## 🏗️ Engenharia de Frontend

O desenvolvimento foi guiado por boas práticas de arquitetura e segurança:

* **Componentização Modular:** Interface construída com componentes reutilizáveis, facilitando a manutenção e a consistência visual em todo o ecossistema do FestApp.
* **Gerenciamento de Estado:** Fluxo de dados otimizado para garantir que as informações de múltiplos tenants (organizadores) sejam exibidas com isolamento e fluidez[cite: 2].
* **Segurança na Camada do Cliente:** 
    * Implementação de rotas protegidas que validam o token JWT antes da renderização[cite: 2].
    * Sanitização de entradas para prevenir ataques de Cross-Site Scripting (XSS)[cite: 2].
    * Limites de caracteres em campos de input para garantir a integridade dos dados enviados ao backend[cite: 2].

## 🛠️ Stack Tecnológica

| Tecnologia | Finalidade Técnica |
| :--- | :--- |
| **React.js** | Biblioteca principal para construção de UI declarativa[cite: 2]. |
| **Axios** | Cliente HTTP para consumo seguro da API backend[cite: 2]. |
| **React Router** | Gerenciamento de navegação e proteção de rotas privadas[cite: 2]. |
| **CSS/Styled-Components** | Estilização moderna com escopo isolado por componente. |

## 🚀 Diferenciais de UX

1. **Interface Responsiva:** Adaptada para uso em diferentes dispositivos, permitindo que organizadores gerenciem eventos de qualquer lugar[cite: 2].
2. **Feedback em Tempo Real:** Tratamento de erros e estados de carregamento (loading) para uma experiência de uso sem atritos.
3. **Consumo Otimizado:** Integração eficiente com o Supabase e o backend Java 21 para garantir baixa latência na exibição de dados[cite: 2].

---

## ⚖️ Licença e Propriedade Intelectual

**Copyright (c) 2026 Weslley Dos Santos. Todos os direitos reservados.**

Este código-fonte é de propriedade exclusiva de **Weslley Dos Santos**.
* **É ESTRITAMENTE PROIBIDO:** A cópia, reprodução, distribuição ou modificação sem autorização prévia por escrito.
* O uso não autorizado constitui violação de direitos autorais e está sujeito a medidas judiciais cabíveis (indenizações e sanções penais).

---

> *Desenvolvido com foco em escalabilidade e segurança por Weslley Dos Santos.*
