import "../../styles/all.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

function Contacto() {
    return (
        <>
            <BarraNav />
                <main className="form-container">
                    <div className="contacto-container">
                        <form id="form-contacto">
                        
                            <h2>Formulario de Contacto</h2>
                            <input type="text" id="nombre" name="nombre" placeholder="Nombre completo *" required />
                            <input type="email" id="correo" name="correo" placeholder="Correo electrónico *" required />
                            <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí..." required></textarea>

                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </main>
            <Footer />
        </>
    )
}

export default Contacto;