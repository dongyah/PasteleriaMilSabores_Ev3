import "../../styles/all.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

function Nosotros() {
    return(
        <>
            <BarraNav />
                <main>
                    <h2 className="titulo-blog">Nosotros</h2>
                    <div className="blog-container">
            
                        <div className="blog-card">
                            <h3>Misión</h3>
                            <p>Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.</p>
                            <img src="img/mision.png" alt="chef con un pastel"/>
                        </div>

                        <div className="blog-card">
                            <h3>Visión</h3>
                            <p>Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos talentos en gastronomía.</p>
                            <img src="img/vision.png" alt="Multiples chef haciendo pasteles"/>
                        </div>
                    </div>
                </main>
            <Footer />
        </>
    )
}
export default Nosotros;