"use client";
import { useActionState } from "react";
import { loginAction } from "../../app/hallinta/actions";
import { Notice, Field } from "./AdminForms";
export function LoginForm(){const [state,action,pending]=useActionState(loginAction,{});return <form className="admin-form" action={action}><Notice state={state}/><Field name="email" label="Sähköposti" type="email" autoComplete="username" required/><Field name="password" label="Salasana" type="password" autoComplete="current-password" required/><button className="ea-button ea-button-primary" disabled={pending}>{pending?"Kirjaudutaan…":"Kirjaudu hallintaan"}</button><p className="admin-help">Vain erikseen lisätyille hallinnoijille. Julkista rekisteröitymistä ei ole.</p></form>;}
