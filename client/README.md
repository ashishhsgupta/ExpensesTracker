# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


<!-- Note: Following step for running project:- -->

<!-- => I have made the fullstack expense_tracker project as mentioned on guideline. I have used mysql database instead of mongodb due to antivirus blocking & some ristriction on system of mongodb link and other links. 
=> Frontend = React.js
=> Backend = Node.js
=> Database = MySql workbench

steps=> I have made two folder, for fronted folder name is "client" and for backend folder name is "server", start the frontend, run the command "npm run dev" and for backend start run the command "npm start", -->

<!-- Running port: http://localhost:5173 -->

<!-- database step =>


=> show databases;
=> create database expances;
=> use expances;

=> create table transactions(
 id bigint unsigned auto_increment primary key,
 type ENUM('income','expanse') not null,
 amount decimal(12,2) not null check (amount >=0),
 description varchar(500),
 category varchar(100),
 date DATE not null,
 created_at timestamp default current_timestamp,
 updated_at timestamp default current_timestamp on update current_timestamp
);

=> select * from transactions; -->
