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
    public class PlaylistController : Controller
    {
        private PlaylistRESTService playlistService = new PlaylistRESTService();
        private SongRESTService songService = new SongRESTService();
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<ActionResult> GetPlaylists(string nombre, string autor, string accessToken)
        {
            try
            {
                var listado = new List<DTOPlaylist>();
                var jsonResult = new JsonResult();

                listado = await playlistService.GetPlaylists(nombre, autor, accessToken);
                for (int i = 0; i < listado.Count; i++)
                {
                    if (listado[i].author != autor) {
                        listado.RemoveAt(i);
                        i -= 1;
                    }
                    if (nombre != "") {
                        if (listado[i].name != nombre) {
                            listado.RemoveAt(i);
                            i -= 1;
                        }
                    }
                }
                jsonResult = Json(new { data = listado /*, draw = draw, recordsFiltered = listado.TotalOrdenes */}, JsonRequestBehavior.AllowGet);

                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al cargar el listado de playlists: " + ex.ToString();
                return null;
            }

        }

        [HttpGet]
        public async Task<ActionResult> GetSongs(string accessToken)
        {
            List<DTOSong> lista = new List<DTOSong>();
            try
            {

                lista = await new PlaylistRESTService().GetSongs(accessToken);
                lista = lista.OrderBy(p => p.name).ToList();

                return Json(lista.Select(x => new
                {
                    id = x.id,
                    name = x.name,
                    author = x.author,
                    genre = x.genre.ToString()
                }).ToList(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al cargar el listado de songs: " + ex.ToString();
                return null;
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetPlaylistSongs(int id, string accessToken)
        {
            DTOPlaylist playlist = new DTOPlaylist();
            try
            {

                playlist = await new PlaylistRESTService().GetPlaylistSongs(id, accessToken);
                List<DTOSong> songs = playlist.songs;

                songs = songs.OrderBy(p => p.name).ToList();

                return Json(songs.Select(x => new
                {
                    id = x.id,
                    name = x.name,
                    author = x.author,
                    genre = x.genre.ToString()
                }).ToList(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al cargar el listado de songs: " + ex.ToString();
                return null;
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddPlaylist(string nombre, string autor, string accessToken)
        {
            try
            {

                var playlist = new DTOPlaylist()
                {
                    name = nombre,
                    author = autor,
                    songs = new List<DTOSong>(),
                };

                var res = await playlistService.AddPlaylist(playlist, accessToken);

                TempData["success"] = "La playlist se agrego correctamente.";
                return RedirectToAction("Index", "Playlist");

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al agregar la playlist: " + ex.ToString();
                return RedirectToAction("Index", "Playlist");
            }

        }

        [HttpPost]
        public async Task<string> AddSong(string ids, int songId, string accessToken)
        {
            try
            {
                List<string> playlistsIds = ids.Remove(ids.Length - 1).Split(',').ToList();
                DTOSong songRes = await songService.GetSong(songId, accessToken);

                for (int i = 0; i < playlistsIds.Count; i++)
                {
                    var res2 = await playlistService.AddSong(playlistsIds[i], songRes, accessToken);
                }               

                TempData["success"] = "La song se agrego correctamente.";
                return "La song se agrego correctamente";

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al agregar la song: " + ex.ToString();
                return "";
            }

        }

        [HttpPut]
        public async Task<ActionResult> EditPlaylist(int id, string nombre, string autor, List<DTOSong> songs, string accessToken)
        {
            try
            {
                var playlist = new DTOPlaylist()
                {
                    id = id,
                    name = nombre,
                    author = autor,
                    songs = songs
                };

                var res = await playlistService.EditPlaylist(playlist, accessToken);

                TempData["success"] = "La playlist se edito correctamente.";
                return RedirectToAction("Index", "Playlist");

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al editar la playlist: " + ex.ToString();
                return RedirectToAction("Index", "Playlist");
            }

        }

        [HttpDelete]
        public async Task<ActionResult> DeletePlaylist(int id, string accessToken)
        {
            try
            {

                DTOPlaylist playlist = new DTOPlaylist();
                playlist = await new PlaylistRESTService().GetPlaylistSongs(id, accessToken);
                List<DTOSong> songs = playlist.songs;
                if (songs.Count > 0)
                {
                    for (int i = 0; i < songs.Count; i++)
                    {
                        var res1 = await playlistService.DeleteSong(id, songs[i].id, accessToken);
                    }
                }                

                var res2 = await playlistService.DeletePlaylist(id, accessToken);

                TempData["success"] = "Las playlist se elimino correctamente.";
                return RedirectToAction("Index", "Playlist");

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al eliminar la playlist: " + ex.ToString();
                return RedirectToAction("Index", "Playlist");
            }

        }

        [HttpDelete]
        public async Task<ActionResult> DeleteSong(int playlistId, int songId, string accessToken)
        {
            try
            {

                var res = await playlistService.DeleteSong(playlistId, songId, accessToken);

                TempData["success"] = "Las song se elimino correctamente.";
                return RedirectToAction("Index", "Playlist");

            }
            catch (Exception ex)
            {
                TempData["danger"] = "Error al eliminar la song: " + ex.ToString();
                return RedirectToAction("Index", "Playlist");
            }

        }
    }

    

}