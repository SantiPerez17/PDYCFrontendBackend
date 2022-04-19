using MyMusic2._0.Models;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace MyMusic2._0.Servicios
{
    public class UserRESTService
    {
        private string urlApi;

        public UserRESTService()
        {
            urlApi = ConfigurationManager.AppSettings["UrlApi"].ToString();
        }

        public async Task<HttpResponseMessage> Login(User req)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {
                    string json = JsonConvert.SerializeObject(req);

                    string url = string.Format("{0}{1}", urlApi, "login");

                    HttpContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage resp = await httpClient.PostAsync(url, httpcontent);

                    resp.EnsureSuccessStatusCode();

                    return resp;
                }
            }
            catch (Exception ex)
            {              
                throw new Exception("Error al loguear: " + ex.ToString());
            }

        }

        public async Task<bool> AddUser(User user)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {
                    string json = JsonConvert.SerializeObject(user);

                    string url = string.Format("{0}{1}", urlApi, "users");

                    HttpContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage resp = await httpClient.PostAsync(url, httpcontent);

                    resp.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar el user: " + ex.ToString());
            }

        }

        public async Task<bool> EditUser(DTOUser user, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {

                    string json = JsonConvert.SerializeObject(user);

                    string url = string.Format("{0}users/{1}", urlApi, user.id);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage resp = await httpClient.PutAsync(url, httpcontent);

                    resp.EnsureSuccessStatusCode();

                    return true;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al ediar el user: " + ex.ToString());
            }

        }

        public async Task<DTOUser> GetUser(string email)
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    string url = string.Format("{0}users/filter?email={1}", urlApi, email);
                    HttpResponseMessage response = await httpClient.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    return JsonConvert.DeserializeObject<DTOUser>(await response.Content.ReadAsStringAsync());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el user: " + ex.ToString());
            }

        }

        public async Task<HttpResponseMessage> DeleteUser(long id, string accessToken)
        {
            try
            {

                using (HttpClient httpClient = new HttpClient())
                {
                    string url = string.Format("{0}users/{1}", urlApi, id);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await httpClient.DeleteAsync(url);
                    response.EnsureSuccessStatusCode();

                    return response;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el user: " + ex.ToString());
            }

        }

    }
}