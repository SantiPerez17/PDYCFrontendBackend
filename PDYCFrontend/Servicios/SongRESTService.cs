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
    public class SongRESTService
    {
        private string urlApi;

        public SongRESTService()
        {
            urlApi = ConfigurationManager.AppSettings["UrlApi"].ToString();
        }

        public async Task<List<DTOSong>> GetSongs(string nombre, string autor, string genero, string accessToken)
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    string url = "";
                    if (nombre == "")
                    {
                        if (autor == "" && genero != "1000000")
                        {
                            url = string.Format("{0}songs?genre={1}", urlApi, genero);
                        }
                        else if (genero == "1000000" && autor != "")
                        {
                            url = string.Format("{0}songs?author={1}", urlApi, autor);
                        }
                        else if (autor == "" && genero == "1000000")
                        {
                            url = string.Format("{0}songs", urlApi);
                        }
                        else {
                            url = string.Format("{0}songs?author={1}&genre={2}", urlApi, autor, genero);
                        }
                    }
                    else {
                        if (autor == "" && genero != "1000000")
                        {
                            url = string.Format("{0}songs?name={1}&genre={2}", urlApi, nombre, genero);
                        }
                        else if (genero == "1000000" && autor != "")
                        {
                            url = string.Format("{0}songs?name={1}&author={2}", urlApi, nombre, autor);
                        }
                        else if (autor == "" && genero == "1000000")
                        {
                            url = string.Format("{0}songs?name={1}", urlApi, nombre);
                        }
                        else
                        {
                            url = string.Format("{0}songs?name={1}&author={2}&genre={3}", urlApi, nombre, autor, genero);
                        }
                    }
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    return JsonConvert.DeserializeObject<List<DTOSong>>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener las songs: " + ex.ToString());
            }

        }

        public async Task<DTOSong> GetSong(int songId, string accessToken)
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    string url = string.Format("{0}songs/{1}", urlApi, songId);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    return JsonConvert.DeserializeObject<DTOSong>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la song: " + ex.ToString());
            }

        }

        public async Task<bool> AddSong(DTOSong song, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {
                    string json = JsonConvert.SerializeObject(song);

                    string url = string.Format("{0}{1}", urlApi, "songs");
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

        public async Task<bool> EditSong(DTOSong song, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {

                    string json = JsonConvert.SerializeObject(song);

                    string url = string.Format("{0}songs/{1}", urlApi, song.id);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage resp = await httpClient.PutAsync(url, httpcontent);

                    resp.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ediar la song: " + ex.ToString());
            }

        }

        public async Task<bool> DeleteSong(int id, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {

                    string url = string.Format("{0}songs/{1}", urlApi, id);
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
    }
}