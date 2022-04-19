using MyMusic2._0.CustomFilter;
using MyMusic2._0.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace MyMusic2._0.Controllers
{
    public class SongController : Controller
    {
        private SongRESTService songService = new SongRESTService();
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<ActionResult> GetSongs(string nombre, string autor, int genero, string accessToken)
        {
            try
            {
                var listado = new List<DTOSong>();
                var listado2 = new List<Song>();

                Genre gen = (Genre)genero;
                var jsonResult = new JsonResult();

                listado = await songService.GetSongs(nombre, autor, gen.ToString(), accessToken);
                for (int i = 0; i < listado.Count; i++)
                {
                    var song = new Song()
                    {
                        id = listado[i].id,
                        name = listado[i].name,
                        author = listado[i].author,
                        genre = listado[i].genre
                    };
                    listado2.Add(song);
                }
                for (int i = 0; i < listado2.Count; i++)
                {
                    if (nombre != "")
                    {
                        if (listado2[i].name != nombre)
                        {
                            listado2.RemoveAt(i);
                            i -= 1;
                        }
                    }
                }
                jsonResult = Json(new { data = listado2 /*, draw = draw, recordsFiltered = listado.TotalOrdenes */}, JsonRequestBehavior.AllowGet);
                
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al cargar el listado de songs: " + ex.ToString();
                return null;
            }

        }

        [HttpPost]
        public async Task<ActionResult> AddSong(string nombre, string autor, int genero, string accessToken)
        {
            try
            {

                var song = new DTOSong()
                {
                    name = nombre,
                    author = autor,
                    genre = (Genre)genero,
                };

                var res = await songService.AddSong(song, accessToken);

                TempData["success"] = "Las song se agrego correctamente.";
                return RedirectToAction("Index", "Song");

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al agregar la song: " + ex.ToString();
                return RedirectToAction("Index", "Song");
            }

        }

        [HttpPut]
        public async Task<ActionResult> EditSong(int id, string nombre, string autor, int genero, string accessToken)
        {
            try
            {
                var song = new DTOSong()
                {
                    id = id,
                    name = nombre,
                    author = autor,
                    genre = (Genre)genero
                };

                var res = await songService.EditSong(song, accessToken);

                TempData["success"] = "Las song se edito correctamente.";
                return RedirectToAction("Index", "Song");

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al editar la song: " + ex.ToString();
                return RedirectToAction("Index", "Song");
            }

        }

        [HttpDelete]
        public async Task<ActionResult> DeleteSong(int id, string accessToken)
        {
            try
            {

                var res = await songService.DeleteSong(id, accessToken);

                TempData["success"] = "Las song se elimino correctamente.";
                return RedirectToAction("Index", "Song");

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al eliminar la song: " + ex.ToString();
                return RedirectToAction("Index", "Song");
            }

        }

    }
}