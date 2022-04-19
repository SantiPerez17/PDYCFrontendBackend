using MyMusic2._0.Models.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;

namespace MyMusic2._0.Controllers
{
    public class PlaylistRESTService
    {
        private string urlApi;

        public PlaylistRESTService()
        {
            urlApi = ConfigurationManager.AppSettings["UrlApi"].ToString();
        }

        public async Task<List<DTOPlaylist>> GetPlaylists(string nombre, string autor, string accessToken)
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    string url = "";
                    if (autor == "" && nombre == ""){
                        url = string.Format("{0}playlists", urlApi);
                    } else if (autor == "" && nombre != "") {
                        url = string.Format("{0}playlists?name={1}", urlApi, nombre);
                    } else if (nombre == "" && autor != ""){
                        url = string.Format("{0}playlists?author={1}", urlApi, autor);
                    }else {
                        url = string.Format("{0}playlists?name={1}&author={2}", urlApi, nombre, autor);
                    }

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    return JsonConvert.DeserializeObject<List<DTOPlaylist>>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las playlists: " + ex.ToString());
            }

        }

        public async Task<List<DTOSong>> GetSongs(string accessToken)
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    string url = string.Format("{0}songs", urlApi);

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    return JsonConvert.DeserializeObject<List<DTOSong>>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las canciones: " + ex.ToString());
            }

        }

        public async Task<DTOPlaylist> GetPlaylistSongs(int id, string accessToken)
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    string url = string.Format("{0}playlists/{1}", urlApi, id);

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    return JsonConvert.DeserializeObject<DTOPlaylist>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las canciones: " + ex.ToString());
            }

        }

        public async Task<bool> AddPlaylist(DTOPlaylist playlist, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {
                    string json = JsonConvert.SerializeObject(playlist);
                    
                    string url = string.Format("{0}{1}", urlApi, "playlists");

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage resp = await httpClient.PostAsync(url, httpcontent);

                    resp.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar la playlist: " + ex.ToString());
            }

        }

        public async Task<bool> AddSong(string id, DTOSong song, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {
                    string json = JsonConvert.SerializeObject(song);

                    string url = string.Format("{0}playlists/{1}/songs", urlApi, id);

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage resp = await httpClient.PostAsync(url, httpcontent);

                    resp.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar la song: " + ex.ToString());
            }

        }

        public async Task<bool> EditPlaylist(DTOPlaylist playlist, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {

                    string json = JsonConvert.SerializeObject(playlist);

                    string url = string.Format("{0}playlists/{1}", urlApi, playlist.id);

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage resp = await httpClient.PutAsync(url, httpcontent);

                    resp.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ediar la playlist: " + ex.ToString());
            }

        }

        public async Task<bool> DeleteSong(int id, long songId, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {

                    string url = string.Format("{0}playlists/{1}/songs/{2}", urlApi, id, songId);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.DeleteAsync(url);
                    response.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar la song: " + ex.ToString());
            }

        }

        public async Task<bool> DeletePlaylist(int id, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {

                    string url = string.Format("{0}playlists/{1}", urlApi, id);

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.DeleteAsync(url);
                    response.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar la playlist: " + ex.ToString());
            }

        }
    }
}