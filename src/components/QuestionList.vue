<template>
  <div class="flex">
    <div class="flex flex-col side-h-screen p-3 bg-white shadow shadow-bottom-none w-60">
      <div class="space-y-3">
        <div class="flex items-center">
          <h2 class="text-xl font-bold">Dashboard</h2>
        </div>
        <div class="flex-1">
          <ul class="pt-2 pb-4 space-y-1 text-sm">
            <li class="rounded-sm">
              <router-link to="/" class="flex items-center p-2 space-x-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <span>Home</span>
              </router-link>
            </li>
            <li class="rounded-sm">
              <router-link
                to="/user"
                class="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 508.609 508.609"
                  xml:space="preserve"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      style="fill: #8a6753"
                      d="M463.513,508.609H45.097v-74.935c0-34.925,26.109-64.085,60.355-68.493l92.228-36.62h113.25 l92.228,36.62c34.585,4.069,60.355,33.568,60.355,68.493V508.609z"
                    ></path>
                    <path
                      style="fill: #7d5e4a"
                      d="M178.013,348.567v33.568c0,42.723,34.924,78.665,77.648,77.987 c41.367-0.678,74.596-34.585,74.596-76.291v-35.264c0-12.207-9.833-22.04-22.04-22.04H199.714 C187.846,326.866,178.013,336.699,178.013,348.567z"
                    ></path>
                    <path
                      style="fill: #eeb490"
                      d="M202.087,300.419v55.608c0,28.821,23.396,52.217,52.217,52.217l0,0 c28.821,0,52.217-23.396,52.217-52.217v-55.608H202.087z"
                    ></path>
                    <g>
                      <path
                        style="fill: #56545f"
                        d="M254.305,0L254.305,0C182.76,0,125.118,57.981,125.118,129.187v34.585 c0,44.079,35.603,79.682,79.682,79.682h50.522l59.677-185.473c7.46-23.396-6.103-48.487-30.177-54.252 C274.988,1.356,264.816,0,254.305,0z"
                      ></path>
                      <path
                        style="fill: #56545f"
                        d="M312.625,65.78l-57.303,177.674h48.487c44.079,0,79.682-35.603,79.682-79.682v-34.585 c0-26.109-7.799-50.522-21.023-70.866C349.584,38.993,319.746,43.401,312.625,65.78z"
                      ></path>
                    </g>
                    <path
                      style="fill: #faccb4"
                      d="M306.861,94.601H201.748c-24.752,0-44.758,20.005-44.758,44.758v100.705 c0,53.913,43.74,97.314,97.314,97.314l0,0c53.913,0,97.314-43.74,97.314-97.314V139.359 C351.619,114.607,331.613,94.601,306.861,94.601z"
                    ></path>
                    <g>
                      <path
                        style="fill: #f1f3f7"
                        d="M231.926,204.122h-44.079c-6.442,0-11.868-5.425-11.868-11.868V168.18 c0-6.442,5.425-11.868,11.868-11.868h44.079c6.442,0,11.868,5.425,11.868,11.868v24.074 C243.454,198.697,238.368,204.122,231.926,204.122z"
                      ></path>
                      <path
                        style="fill: #f1f3f7"
                        d="M320.763,204.122h-44.079c-6.442,0-11.868-5.425-11.868-11.868V168.18 c0-6.442,5.425-11.868,11.868-11.868h44.079c6.442,0,11.868,5.425,11.868,11.868v24.074 C332.63,198.697,327.205,204.122,320.763,204.122z"
                      ></path>
                    </g>
                  </g>
                </svg>

                <span>Users</span>
              </router-link>
            </li>
            <li class="rounded-sm">
              <router-link to="/student" class="flex items-center p-2 space-x-3 rounded-md">
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 508.609 508.609"
                  xml:space="preserve"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <circle
                        style="fill: #eeb490"
                        cx="150.887"
                        cy="200.053"
                        r="39.672"
                      ></circle>
                      <circle
                        style="fill: #eeb490"
                        cx="357.722"
                        cy="200.053"
                        r="39.672"
                      ></circle>
                    </g>
                    <path
                      style="fill: #9d90c5"
                      d="M463.513,508.609H45.097v-74.935c0-34.925,26.109-64.085,60.355-68.493l92.228-36.62h113.25 l92.228,36.62c34.585,4.069,60.355,33.568,60.355,68.493V508.609z"
                    ></path>
                    <path
                      style="fill: #8075af"
                      d="M178.013,348.567v33.568c0,42.723,34.924,78.665,77.648,77.987 c41.367-0.678,74.596-34.585,74.596-76.291v-35.264c0-12.207-9.833-22.04-22.04-22.04H199.714 C187.846,326.866,178.013,336.699,178.013,348.567z"
                    ></path>
                    <path
                      style="fill: #eeb490"
                      d="M202.087,300.419v55.608c0,28.821,23.396,52.217,52.217,52.217l0,0 c28.821,0,52.217-23.396,52.217-52.217v-55.608H202.087z"
                    ></path>
                    <path
                      style="fill: #faccb4"
                      d="M306.861,94.601H201.748c-24.752,0-44.758,20.005-44.758,44.758v100.705 c0,53.913,43.74,97.314,97.314,97.314l0,0c53.913,0,97.314-43.74,97.314-97.314V139.359 C351.619,114.607,331.613,94.601,306.861,94.601z"
                    ></path>
                    <g>
                      <path
                        style="fill: #56545f"
                        d="M351.619,52.895c0,0,74.935,9.833,0,151.226V146.14c0,0-5.425-41.706-30.856-44.079L351.619,52.895z "
                      ></path>
                      <path
                        style="fill: #56545f"
                        d="M300.758,0h-92.906c-3.73,0-7.46,0.339-10.85,1.017l0,0c-140.376,0-40.011,210.225-40.011,210.225 c0-81.038,50.861-81.377,50.861-81.377h93.245c35.942,0,64.763-29.16,64.763-64.763l0,0C365.86,29.16,336.699,0,300.758,0z"
                      ></path>
                    </g>
                  </g>
                </svg>

                <span>Students</span>
              </router-link>
            </li>
            <li class="rounded-sm">
              <router-link to="/question" class="flex items-center p-2 space-x-3 rounded-md">
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  xml:space="preserve"
                  fill="#5637a0"
                  stroke="#5637a0"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g id="question_x5F_mark">
                        <g>
                          <path
                            style="fill: #40f78f"
                            d="M17.6,30c0,1.102-0.895,2-2,2s-2-0.898-2-2c0-1.109,0.895-2,2-2S17.6,28.891,17.6,30z"
                          ></path>
                          <path
                            style="fill: #40f78f"
                            d="M15.676,25.977c-1.336,0-2.59-0.523-3.535-1.469c-0.945-1.105-1.465-2.359-1.465-3.695 s0.52-2.59,1.465-3.371l6.688-6.688C19.584,9.996,20,8.992,20,7.926c0-1.07-0.416-2.074-1.172-2.828 c-1.559-1.559-4.096-1.562-5.654,0C12.416,5.852,12,6.855,12,7.926H8c0-2.137,0.834-4.148,2.348-5.66 c3.02-3.023,8.285-3.02,11.309,0.004C23.168,3.777,24,5.785,24,7.926c0,2.137-0.832,4.145-2.344,5.656l-6.688,6.523 c-0.389,0.391-0.389,1.023,0,1.414c0.391,0.391,1.023,0.391,1.414,0c0.254-0.258,0.293-0.555,0.293-0.711h4 c0,1.336-0.52,2.594-1.465,3.699C18.266,25.453,17.012,25.977,15.676,25.977L15.676,25.977z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>

                <span>Questions</span>
              </router-link>
            </li>
            <li class="rounded-sm">
              <router-link to="#" class="flex items-center p-2 space-x-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>

                <span>Logout</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
};
</script>