import React from 'react';
import "../../styles/all.css";

// 1. Importamos los componentes de navegación
import BarraNav from './BarraNav';
import Footer from './Footer';

function Blog(){
    return(
    // 2. Envolvemos todo en un Fragment (<>)
    <>
      <BarraNav />

        <main>
            <h2 className="titulo-blog">Blog</h2>
            <div className="blog-container">

                <div className="blog-card">
                    <h3>Caso N°1</h3>
                    <p>¡Tendencia en pastelería! El «cake painting» está ganando popularidad. Esta técnica, que utiliza pinceles y colorantes comestibles, transforma los pasteles en obras de arte. Si buscas un toque moderno, ¡atrévete a probarla!</p>
                </div>

                <div className="blog-card">
                    <h3>Caso N°2</h3>
                    <p>En un mundo de prisas, nosotros elegimos la paciencia. Cada uno de nuestros postres es el resultado de la dedicación y el cuidado de lo artesanal, donde el amor por los detalles se convierte en el ingrediente principal. Te invitamos a saborear la diferencia.</p>
                </div>

                <div className="blog-card">
                    <h3>Caso N°3</h3>
                    <p>Más que un simple dulce, cada bocado es una experiencia. Nuestros postres están creados para despertar tus sentidos y evocar momentos de felicidad, convirtiendo un simple gusto en un viaje inolvidable lleno de sabor y alegría.</p>
                </div>

                <div className="blog-card large">
                    <h3>Caso N°4</h3>
                    <p>¡Atención a todos los golosos de corazón! Les tenemos una noticia que les va a endulzar el día. En nuestra pastelería chilena, le dimos una vuelta de tuerca a nuestros clásicos de siempre. Lanzamos la línea "Tesoro de la Tierra", inspirada en los sabores más ricos y tradicionales de nuestro país, pero con un toque moderno que te va a volar la cabeza. La joya de la corona es nuestro nuevo "Milhojas de Merquén". Imagínate, la crocancia del milhojas con la calidez del merquén, ofreciendo una experiencia dulce y picantita que no vas a olvidar. Este postre ya está dando que hablar en el mundo de la repostería chilena por su combinación audaz. ¡No te quedes con las ganas! Pégate una vuelta por nuestro blog para cachar todos los detalles de esta locura y para ver las recetas exclusivas.</p>
                </div>

            </div>
        </main>

      <Footer />
    </>
    )
}
export default Blog;