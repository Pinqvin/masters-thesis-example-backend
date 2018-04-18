package data

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class TestSimulation extends Simulation {

  val httpConf = http
    .baseURL("http://localhost:3000") // Here is the root for all relative URLs
    .acceptHeader("application/json") // Here are the common headers
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val rand = new scala.util.Random()

  val scn = scenario("Scenario Name") // A scenario is a chain of requests and pauses
    .exec(http("request_data")
      .get(s"/api/data/${rand.nextInt(1000000)}")
      .check(status.is(200)))

  setUp(scn.inject(rampUsersPerSec(10) to (80) during (30 seconds)).protocols(httpConf))
}
